CREATE DATABASE variantflow;
USE variantflow;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE VariantCategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE VariantOptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    variant_category_id INT NOT NULL,
    value VARCHAR(255) NOT NULL,
    FOREIGN KEY (variant_category_id) REFERENCES VariantCategories(id) ON DELETE CASCADE
);

CREATE TABLE ProductVariants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    variant_option_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE,
    FOREIGN KEY (variant_option_id) REFERENCES VariantOptions(id) ON DELETE CASCADE
);

CREATE TABLE VariantImages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_variant_id INT NOT NULL,
    image_url VARCHAR(2083) NOT NULL,
    is_main BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (product_variant_id) REFERENCES ProductVariants(id) ON DELETE CASCADE
);
