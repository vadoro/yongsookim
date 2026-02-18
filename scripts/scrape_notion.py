import re
import asyncio
from playwright.async_api import async_playwright
from bs4 import BeautifulSoup

NOTION_URL = "https://jazzy-timpani-51c.notion.site/CV-720152021c234c4baa3d610be64cbc1d?source=copy_link"
INDEX_FILE = "index.html"

async def scrape_notion():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto(NOTION_URL)
        
        # Wait for content to load
        await page.wait_for_selector('.notion-page-content', timeout=60000)
        
        # Scroll down to ensure all lazy-loaded content is visible
        for _ in range(10):
            await page.mouse.wheel(0, 500)
            await page.wait_for_timeout(500)

        content = await page.content()
        await browser.close()
        return content

def parse_research(soup):
    html_output = ""
    # Find "Research & Publications" header
    # Notion headers are usually in specific blocks. We look for text.
    headers = soup.find_all(string=re.compile("연구 성과|Research & Publications"))
    if not headers:
        return ""
    
    header = headers[0].find_parent(class_=lambda x: x and 'block' in x)
    
    # Iterate siblings until next major header
    current = header.next_sibling
    while current:
        text = current.get_text()
        if "Special Lectures" in text or "초청 강연" in text or "Conferences" in text or "학술 대회" in text:
            break
            
        # Check if it's a content block
        if text.strip():
            # Basic parsing logic for Research items
            # Expected format: "Title", Source, Year. Link.
            
            year_match = re.search(r'\b(20\d{2})\b', text)
            year = year_match.group(1) if year_match else "N/A"
            
            # Simple category detection
            category = "category-paper"
            if "저서" in text or "Co-authored" in text:
                category = "category-book"
            elif "역서" in text or "Translation" in text:
                category = "category-trans"
                
            # Extract Link
            link = current.find('a')
            link_html = ""
            if link:
                href = link.get('href')
                link_html = f'<a href="{href}" class="pub-link">DOI/Link</a>'
            
            item_html = f"""
                    <div class="pub-item {category}">
                        <span class="pub-year">{year}</span>
                        <div class="pub-details">
                            <h4 class="pub-title">{text[:100]}...</h4>
                            <p class="pub-source">{text}</p>
                            {link_html}
                        </div>
                    </div>"""
            html_output += item_html
            
        current = current.next_sibling
        
    return html_output

def parse_lectures(soup, header_keyword):
    html_output = ""
    headers = soup.find_all(string=re.compile(header_keyword))
    if not headers:
        return ""
    
    header = headers[0].find_parent(class_=lambda x: x and 'block' in x)
    current = header.next_sibling
    
    while current:
        text = current.get_text()
        # Stop at next major headers
        if any(x in text for x in ["Special Lectures", "초청 강연", "Conferences", "학술 대회", "수상 내역", "Awards"]) and header_keyword not in text:
            break
            
        if text.strip():
            # Date parsing (simple approximation)
            date_match = re.search(r'(\d{4}\.\d{2}(\.\d{2})?|Dec \d{4}|Nov \d{4}|Oct \d{4}|Sep \d{4}|Aug \d{4}|Jul \d{4}|Jun \d{4}|May \d{4}|Apr \d{4}|Mar \d{4}|Feb \d{4}|Jan \d{4})', text)
            date = date_match.group(0) if date_match else "Recent"
            
            item_html = f"""
                    <div class="lecture-item">
                        <span class="lecture-date">{date}</span>
                        <p>{text}</p>
                    </div>"""
            html_output += item_html
            
        current = current.next_sibling
        
    return html_output

def update_index_html(research_html, lecture_html, conference_html):
    with open(INDEX_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    soup = BeautifulSoup(content, 'html.parser')
    
    if research_html:
        target = soup.find(id="research-list")
        if target:
            target.clear()
            # Append parsed content safely
            new_soup = BeautifulSoup(research_html, 'html.parser')
            if new_soup.body:
                for element in new_soup.body.contents:
                    target.append(element)
            else:
                for element in new_soup.contents:
                    target.append(element)

    if lecture_html:
        target = soup.find(id="lecture-list")
        if target:
            target.clear()
            new_soup = BeautifulSoup(lecture_html, 'html.parser')
            if new_soup.body:
                for element in new_soup.body.contents:
                    target.append(element)
            else:
                for element in new_soup.contents:
                    target.append(element)
            
    if conference_html:
        target = soup.find(id="conference-list")
        if target:
            target.clear()
            new_soup = BeautifulSoup(conference_html, 'html.parser')
            if new_soup.body:
                for element in new_soup.body.contents:
                    target.append(element)
            else:
                for element in new_soup.contents:
                    target.append(element)
            
    with open(INDEX_FILE, 'w', encoding='utf-8') as f:
        f.write(str(soup))

async def main():
    print("Fetching Notion content...")
    html_content = await scrape_notion()
    soup = BeautifulSoup(html_content, 'html.parser')
    
    print("Parsing Research...")
    research_html = parse_research(soup)
    
    print("Parsing Special Lectures...")
    lecture_html = parse_lectures(soup, "초청 강연|Special Lectures")
    
    print("Parsing Conferences...")
    conference_html = parse_lectures(soup, "학술 대회|Conferences")
    
    print("Updating index.html...")
    update_index_html(research_html, lecture_html, conference_html)
    print("Done!")

if __name__ == "__main__":
    asyncio.run(main())
