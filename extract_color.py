from PIL import Image

def get_dominant_color(image_path):
    img = Image.open(image_path)
    # Resize to 1x1 to get the average color
    img = img.resize((1, 1), resample=0)
    color = img.getpixel((0, 0))
    # Format as hex
    hex_color = '#{:02x}{:02x}{:02x}'.format(color[0], color[1], color[2])
    print(f"Dominant Hex Color: {hex_color}")
    return hex_color

if __name__ == "__main__":
    get_dominant_color("/tmp/file_attachments/image.png")
