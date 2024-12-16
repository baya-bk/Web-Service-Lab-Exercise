import xml.etree.ElementTree as ET


def read_config(file_path):
    # Parse the XML file
    tree = ET.parse(file_path)
    root = tree.getroot()

    # Extract database settings
    db_host = root.find(".//database/host").text
    db_port = root.find(".//database/port").text
    db_username = root.find(".//database/username").text
    db_password = root.find(".//database/password").text
    db_name = root.find(".//database/dbname").text

    # Extract log settings
    log_level = root.find(".//log/level").text
    log_file = root.find(".//log/file").text

    # Extract user settings
    user_theme = root.find(".//user/theme").text
    user_language = root.find(".//user/language").text

    # Display the configuration
    print("Database Settings:")
    print(f"Host: {db_host}")
    print(f"Port: {db_port}")
    print(f"Username: {db_username}")
    print(f"Password: {db_password}")
    print(f"Database Name: {db_name}")

    print("\nLog Settings:")
    print(f"Level: {log_level}")
    print(f"Log File: {log_file}")

    print("\nUser Preferences:")
    print(f"Theme: {user_theme}")
    print(f"Language: {user_language}")


if __name__ == "__main__":
    read_config("config.xml")
