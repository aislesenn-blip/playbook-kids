import re

with open("unimonday-web/src/app/workspace/page.tsx", "r") as f:
    content = f.read()

# Add a text wrap container inside TipTap to prevent text from overflowing to the edges
content = content.replace("class: 'prose max-w-none focus:outline-none min-h-[800px]',", "class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[800px] w-full max-w-[100%]',\n        style: 'width: 100%; max-width: 100%; word-wrap: break-word;',")

# Improve parser to handle font sizes correctly and line breaks
content = content.replace("html += `<h1 style=\"${styleString}\"><strong>${content}</strong></h1>`;", "html += `<h1 style=\"${styleString} margin-bottom: 20px; word-wrap: break-word;\"><strong>${content}</strong></h1>`;")
content = content.replace("html += `<p style=\"${styleString}\">${formattedContent}</p>`;", "html += `<p style=\"${styleString} margin-bottom: 12px; word-wrap: break-word;\">${formattedContent}</p>`;")
content = content.replace("html += `<p style=\"${styleString}\">${content}</p>`;", "html += `<p style=\"${styleString} margin-bottom: 12px; word-wrap: break-word;\">${content}</p>`;")

with open("unimonday-web/src/app/workspace/page.tsx", "w") as f:
    f.write(content)
