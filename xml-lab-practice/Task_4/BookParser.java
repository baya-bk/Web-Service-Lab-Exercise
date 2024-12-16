import org.w3c.dom.*;
import javax.xml.parsers.*;

import java.io.File;

public class BookParser {
    public static void main(String[] args) {
        try {
            // Load XML file
            File xmlFile = new File("book.xml");
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(xmlFile);

            // Normalize the document
            doc.getDocumentElement().normalize();

            // Get the first book element
            NodeList nodeList = doc.getElementsByTagName("book");
            Node node = nodeList.item(0);

            if (node.getNodeType() == Node.ELEMENT_NODE) {
                Element element = (Element) node;

                // Create a new Book object
                Book book = new Book();
                book.setTitle(element.getElementsByTagName("title").item(0).getTextContent());
                book.setAuthor(element.getElementsByTagName("author").item(0).getTextContent());
                book.setYear(Integer.parseInt(element.getElementsByTagName("year").item(0).getTextContent()));
                book.setIsbn(element.getElementsByTagName("isbn").item(0).getTextContent());

                // Display book information
                book.displayBookInfo();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
