from flask import Flask, Response
from flask_cors import CORS  # Import CORS
import xml.etree.ElementTree as ET

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample data (usually, this would come from a database or other source)
books = [
    {"title": "XML Programming", "author": "John Doe",
        "year": "2024", "isbn": "123-456-789"},
    {"title": "Learning XSLT", "author": "Jane Smith",
        "year": "2022", "isbn": "987-654-321"},
    {"title": "Mastering XPath", "author": "Michael Brown",
        "year": "2023", "isbn": "555-444-333"}
]

# Create an XML response for the book list


@app.route('/books', methods=['GET'])
def get_books():
    # Create the root element of XML
    library = ET.Element("library")

    # Add book data to the XML structure
    for book in books:
        book_element = ET.SubElement(library, "book")
        title = ET.SubElement(book_element, "title")
        title.text = book["title"]
        author = ET.SubElement(book_element, "author")
        author.text = book["author"]
        year = ET.SubElement(book_element, "year")
        year.text = book["year"]
        isbn = ET.SubElement(book_element, "isbn")
        isbn.text = book["isbn"]

    # Generate the XML string
    xml_str = ET.tostring(library, encoding="utf-8", method="xml")

    # Return the XML response with the correct content type
    return Response(xml_str, mimetype='application/xml')


if __name__ == '__main__':
    app.run(debug=True)
