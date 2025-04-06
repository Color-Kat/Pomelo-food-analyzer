import json
import asyncio

class OCRService:
    def __init__(self):
        pass

    async def extract_text(self, photo_url, type = 'food'):
        """
        Extract text from the given image using OCR.
        :param photo_url: Path to the image file.
        :return: Extracted text.
        """

        print(f"Recognizing text on photo: {photo_url}")
        
        # Processing imitation
        await asyncio.sleep(3)  
        
        # Mock ocr result
        return {
            "status": "recognized",
            "ingredients": ["сахар", "соль", "мука", "E228", "E146", "E616"],
        }