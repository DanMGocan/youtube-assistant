

Let's tackle these practice exam questions one by one:

### 1(a). Discuss two advantages of using a Relational Database for data persistence, when compared to using an operating system’s standard file system.

**Advantages of Using a Relational Database:**

1. **Structured Query Language (SQL) Support**: Relational databases support SQL, which is a powerful and standardized language for querying and manipulating data. This allows for complex queries, updates, and data manipulation that are more difficult and less standardized with file systems.

2. **Transaction Management**: Relational databases provide built-in support for transactions. This includes capabilities for ensuring consistency and integrity of data through properties like atomicity, consistency, isolation, and durability (ACID). This means that several operations can be grouped together and either all of them commit or none, ensuring data consistency even in cases of a system failure. Standard file systems generally do not support such transactional consistency and atomic operations.

### 1(b). Explain why a surrogate key should not be used as Primary Key in tables devised to express many-to-many relationships.

**Surrogate Key in Many-to-Many Relationships:**

A surrogate key is an artificial key that uniquely identifies a row in a table. In the context of many-to-many relationships, using a surrogate key as a primary key in a junction table can obscure the natural relationships between the tables and potentially allow duplicate entries for the combination of foreign keys. Here's why it's generally avoided:

- **Natural Composite Key Use**: Instead of a surrogate key, a composite key consisting of foreign keys that reference the linked tables should be used. This naturally enforces uniqueness of the combinations of entries, which is essential in many-to-many relationships to avoid redundant data linking.

- **Redundancy and Integrity**: Using a surrogate key requires additional mechanisms to ensure that duplicate relationships are not created. If only the surrogate key is unique but not the combination of foreign keys, it could lead to data redundancy and integrity issues.

### 1(c). Comment on the following statement: “Adding more Indexes will always make a Database Management System perform better”.

**Impact of Adding More Indexes:**

This statement is not entirely accurate. While indexes can improve the performance of read operations by reducing the amount of data that needs to be scanned during queries, they also have drawbacks:

- **Decreased Write Performance**: Every time data is inserted, updated, or deleted, all indexes on the table must be updated. This can significantly slow down write operations, especially on tables with a large number of indexes.

- **Increased Storage Space**: Indexes require additional storage space. This can lead to increased usage of disk resources and potentially slow down the system if the storage is not managed properly.

- **Optimization Overhead**: Maintaining and optimizing indexes, especially in large databases, can add overhead that might offset the performance gains from faster reads.

Adding indexes should be done strategically, focusing on frequently queried columns and considering the overall impact on the system's performance for both read and write operations.



Let's address these three additional queries:

### 1(d). Describe an example of a “Dirty Read” in transactional databases.

**Dirty Read Example:**

A dirty read occurs when a transaction reads data that has been written by another transaction that has not yet been committed. This can lead to problems if the second transaction is rolled back, meaning the first transaction read data that was never officially saved.

**Example:**
Suppose Transaction A updates a row in the `Accounts` table to change the balance from $100 to $200, but has not yet committed the change. Concurrently, Transaction B reads the same row before Transaction A commits or rolls back. Transaction B sees the balance as $200 and makes decisions based on this balance (e.g., approving a withdrawal based on this amount). If Transaction A later rolls back its update, the balance returns to $100, but Transaction B's actions were based on the incorrect, "dirty" data.

### 1(e). Comment on the following statement: “Database Management System Administrators should always define a Transaction Isolation Level of Serializable”.

**Comment on Serializable Isolation:**

Serializable is the highest level of isolation in transaction processing and ensures complete isolation from other transactions, making the transaction appear as if it is the only one interacting with the database. While this level eliminates phenomena like dirty reads, non-repeatable reads, and phantom reads, it is not always the best choice due to its impact on performance:

- **Performance Impact:** Serializable can significantly slow down transaction processing because it often requires locking resources more aggressively, which can lead to increased lock contention and reduced throughput in a system with many concurrent transactions.
  
- **Not Always Necessary:** Lower levels of isolation (e.g., Read Committed or Repeatable Read) might be sufficient depending on the application's specific consistency requirements, and can perform better with less overhead.

It's important for DBMS administrators to balance the need for data consistency with performance requirements and choose an appropriate isolation level based on the specific use case.

### 1(f). Discuss two circumstances where Stored Procedures might become useful in Database Systems.

**Usefulness of Stored Procedures:**

1. **Complex Business Logic:** Stored procedures are very useful when complex business logic that requires multiple SQL statements needs to be executed atomically. They allow all these statements to be encapsulated in the database as a single callable routine. This can simplify client-side code, reduce network traffic, and ensure consistent implementation of the logic across different applications that use the database.

2. **Security and Access Control:** Stored procedures can enhance security by restricting direct access to tables and instead providing a limited interface to perform specific operations. For example, a stored procedure can allow a user to insert data into a table without giving them permission to directly insert into the table, thereby helping to prevent SQL injection attacks and ensuring data integrity by controlling exactly what can be inserted and how.

Stored procedures also encapsulate logic within the database, which can lead to better maintenance and management of the code, especially in large or complex systems.



Let's break down each part of this complex query related to a supermarket chain in Ireland that needs a transactional database to manage product orders.

### (a) Provide an Entity-Relationship Diagram (ERD) with Chen Style

Here’s a description of the ERD based on the requirements:

#### Entities:
1. **Order**
   - Attributes: Order ID, Order Date, Order Time
   - Relationships: Made at one branch, contains multiple products
2. **Product**
   - Attributes: SKU (Primary Key), Description
   - Relationships: Can be included in multiple orders
3. **Branch**
   - Attributes: Branch ID, Street, City, Telephone Number, Manager Name, Manager Email
   - Relationships: Processes multiple orders

#### Relationships:
1. **Orders to Products (Many-to-Many)**
   - Includes a junction table (Order Details) containing: Order ID, SKU, Quantity, Unit Price
2. **Orders to Branch (Many-to-One)**
   - Each order is placed at one branch.

**Assumptions:**
- Each order can contain multiple products, and each product can appear in multiple orders, thus requiring a junction table (Order Details) to handle the many-to-many relationship.
- Orders are uniquely identified by an Order ID and are linked to one specific branch.

This ERD would use Chen notation with rectangles for entities, diamonds for relationships, and ovals for attributes. Lines connect entities to relationships indicating cardinality (one-to-many, many-to-one, many-to-many as appropriate).

### (b) Translate the ERD into physical database tables

#### Tables:
1. **Branch**
   - Columns: Branch_ID (PK), Street, City, Telephone, Manager_Name, Manager_Email
2. **Product**
   - Columns: SKU (PK), Description
3. **Order**
   - Columns: Order_ID (PK), Order_Date, Order_Time, Branch_ID (FK)
4. **Order_Details** (Junction table for the many-to-many relationship)
   - Columns: Order_ID (FK), SKU (FK), Quantity, Unit_Price
   - Primary Key: (Order_ID, SKU)

**Keys and Indexes:**
- Primary keys (PK) and foreign keys (FK) as noted above.
- Consider indexes on commonly searched columns like Branch_ID in Orders, SKU in Order_Details.

### (c) Is the solution in Third Normal Form (3NF)?

The proposed database design should meet the Third Normal Form (3NF) because:
- All tables are already in 1NF as each table column contains only atomic values, and there are no repeating groups.
- All tables are in 2NF because there are no partial dependencies of any column on the primary key.
- All tables are in 3NF as there are no transitive dependencies; all non-primary key columns are directly dependent on the primary keys and not on any other non-primary key columns.

### (d) Provide the SQL code to create a table “Order”

Here is an SQL example to create the `Order` table with appropriate data types and constraints:

```sql
CREATE TABLE `Order` (
  `Order_ID` INT NOT NULL AUTO_INCREMENT,
  `Order_Date` DATE NOT NULL,
  `Order_Time` TIME NOT NULL,
  `Branch_ID` INT NOT NULL,
  PRIMARY KEY (`Order_ID`),
  FOREIGN KEY (`Branch_ID`) REFERENCES Branch(`Branch_ID`)
);
```

This SQL code defines the `Order` table with a primary key that auto-increments, ensuring unique identifiers for each order, and a foreign key that links each order to a branch, ensuring referential integrity. The date and time data types match the requirements for storing specific order timing information.



Here's how to tackle each of the SQL tasks based on the given schema for the "World Database".

### (a) List all the countries with ‘Population’ of at least 10 million.

```sql
SELECT Name
FROM country
WHERE Population >= 10000000;
```

This SQL query selects the names of all countries from the `country` table where the population is 10 million or more.

### (b) List all countries by ‘Name’ and the number of languages spoken in it, including countries without any language listed.

```sql
SELECT c.Name, COUNT(l.Language) AS Number_of_Languages
FROM country c
LEFT JOIN countrylanguage l ON c.Code = l.CountryCode
GROUP BY c.Name;
```

This SQL query joins the `country` table and the `countrylanguage` table on the country code, counting the number of languages associated with each country. It uses a `LEFT JOIN` to ensure that countries without any languages listed are included, showing `0` for their language count.

### (c) Create an SQL View to list all the cities with ‘English’ as an official language (`isOfficial = 'T'`).

```sql
CREATE VIEW EnglishSpeakingCities AS
SELECT ci.Name
FROM city ci
JOIN countrylanguage cl ON ci.CountryCode = cl.CountryCode
WHERE cl.Language = 'English' AND cl.isOfficial = 'T';
```

This SQL statement creates a view named `EnglishSpeakingCities` that lists all cities where English is an official language. It joins the `city` and `countrylanguage` tables on the country code and filters for English as an official language.

### (d) Create a Stored Procedure to list the countries whose names start with the letter ‘P’.

```sql
CREATE PROCEDURE ListCountriesStartingWithP()
BEGIN
    SELECT Name
    FROM country
    WHERE Name LIKE 'P%';
END;
```

This stored procedure, when called, will list all countries whose names begin with the letter 'P'. The procedure does not take any parameters and performs a simple `SELECT` operation with a `LIKE` clause to match names starting with 'P'.

These SQL codes are based on standard SQL syntax and should be compatible with most SQL databases, although minor adjustments might be necessary depending on the specific SQL dialect, like Oracle SQL or MySQL.



Let's address each part of your query based on the information provided.

### (a) Discuss two situations where the use of a Relational Database might not be the most appropriate solution.

1. **Handling Large Volumes of Unstructured Data**: Relational databases are structured to handle well-defined, structured data and may struggle with unstructured data like multimedia files (videos, images), social media content, or documents. NoSQL databases or specialized data storage systems (e.g., file stores, data lakes) are better suited for managing this type of data due to their schema-less nature, which provides more flexibility.

2. **Real-Time Processing of Big Data**: For applications requiring real-time analysis and processing of huge volumes of data, such as big data analytics and high-speed data streaming (e.g., financial trading systems, real-time traffic monitoring), a relational database might not offer the necessary performance due to its transaction and consistency overheads. Systems like Apache Kafka for streaming data, or specialized big data platforms like Hadoop or NoSQL databases (e.g., Cassandra, MongoDB), provide better performance for these use cases.

### (b) Explain the advantage of describing Data Models in different levels of abstraction, such as External, Conceptual, Logical, and Internal layers.

The use of different layers of data modeling abstraction (External, Conceptual, Logical, and Internal) offers several advantages:

- **Clarity and Simplification**: Each layer focuses on different aspects of the database design, tailored to different audiences. The external model caters to end-user interactions, the conceptual model addresses the system analyst’s view, the logical model is for the database designer, and the internal model handles the physical aspects of storage. This separation clarifies complex systems by breaking them down into more manageable parts.

- **Flexibility and Reusability**: Changes in one model do not necessarily affect others. For instance, you can change the physical storage of data (Internal) without altering the logical structure that the applications use. This flexibility allows for easier maintenance and scaling of systems.

- **Efficiency in Design and Troubleshooting**: By separating concerns, each model can be optimized independently. For example, database administrators can optimize the internal model for performance without affecting the user's view of the data. Similarly, issues can be addressed more effectively at the relevant abstraction level.

### (c) Explain why search with B-Tree indexes is so efficient.

B-Tree indexes significantly enhance search efficiency due to several factors:

- **Balanced Tree Structure**: B-Trees maintain a balanced structure, which ensures that all leaf nodes are at the same distance from the root. This balance allows operations like search, insert, delete, and update to be performed in logarithmic time complexity (O(log n)).

- **High Fan-out**: B-Trees have a high fan-out, meaning each node can have many children. This reduces the depth of the tree and the number of disk accesses required to find an item, as fewer nodes need to be traversed.

- **Orderly Storage and Retrieval**: Data in a B-Tree is stored in sorted order, allowing for efficient range queries in addition to fast search operations. The tree structure allows the database to skip over large sections of data, quickly zeroing in on the desired range.

- **Minimization of Disk I/O Operations**: Because nodes are loaded into memory page-wise (with each node possibly representing a page), and due to the tree's balance and sort order, the number of disk I/O operations is minimized, which is often the bottleneck in database environments.

These characteristics make B-Trees particularly suitable for databases where quick reading and writing of data are critical, and they are used extensively in both relational and non-relational database systems.



Here's how to tackle each part of the query based on the information provided about transactional databases.

### (d) Describe an example of a “Non-repeatable Read” in transactional databases.

**Non-repeatable Read Example:**
A non-repeatable read occurs when a transaction reads the same row twice and gets different data each time. This typically happens when another transaction modifies the data after the initial read but before the second read.

**Example:**
Transaction A retrieves a row from the `Customers` table to view a customer's address. Meanwhile, Transaction B updates that same customer's address and commits the change. When Transaction A attempts to read the row again, it retrieves the new, updated address. This results in Transaction A having two different reads for the same data within the same transaction, which is a classic case of non-repeatable read.

### (e) Describe a context in which a Transaction Isolation Level of Read Committed would be suitable, including an indication of who blocks whom in such circumstances.

**Context for Read Committed:**
Read Committed is a transaction isolation level that ensures a transaction only reads data that has been committed before the transaction began. It is suitable for applications where the accuracy of data during a transaction is crucial but where the overhead of higher isolation levels like Serializable is considered too costly.

**Suitable Scenario:**
A typical scenario would be an online booking system, where users need to see the latest available items (e.g., seats, rooms) without interference from uncommitted changes made by other users. It prevents dirty reads but still allows non-repeatable reads, striking a balance between data consistency and system performance.

**Who Blocks Whom:**
In Read Committed, a transaction does not see uncommitted changes made by other transactions, meaning it only reads data committed before it started. Writes within a transaction can block other writes but not reads, aiming to prevent updates based on uncommitted data.

### (f) Discuss the disadvantages of using Stored Procedures in Database Systems.

**Disadvantages of Stored Procedures:**

1. **Complexity in Maintenance:** Stored procedures can become complex and difficult to maintain, especially when business logic changes frequently. The logic is embedded in the database, requiring database developers to make updates and potentially leading to more frequent deployments of database changes.

2. **Portability Issues:** Stored procedures are often tightly coupled with the specific SQL dialects and capabilities of a particular database management system. This can make migrating to a different database system problematic, as stored procedures might need significant rewrites.

3. **Performance Overhead:** While stored procedures can improve performance by reducing network traffic and encapsulating business logic near the data, they can also lead to increased load on the database server itself. If not carefully managed, this can impact overall server performance and scalability.

4. **Security Concerns:** Incorrectly written or improperly secured stored procedures can lead to security vulnerabilities, such as SQL injection attacks, if dynamic SQL is used within the procedures and not handled safely.

5. **Testing and Debugging Difficulty:** Stored procedures are harder to debug compared to application code because most database management systems do not offer robust debugging tools. Testing can also be more cumbersome as it often requires different techniques and tools compared to application testing.



Here's how to handle the given tasks about an e-commerce website transactional database project focused on product returns.

### (a) Entity-Relationship Diagram (ERD) with Chen Style

For the given scenario, the ERD would include the following entities:

1. **Return**:
   - Attributes: Return ID, Return Date, Payment Method
   - Relationships: Linked to many products and one customer.

2. **Product**:
   - Attributes: SKU, Description, Brand
   - Relationships: Can be part of many returns.

3. **Customer**:
   - Attributes: Customer ID, Name, Address, Date of Birth, Telephone Number, Email
   - Relationships: Can initiate many returns.

#### Relationships:
- **Returns to Products** (Many-to-Many): Needs a junction table like `Return_Details` containing attributes such as Return ID, SKU, Quantity Returned, Unit Price, and Motive for Return.
- **Returns to Customer** (Many-to-One): Each return is initiated by one customer.

**ERD Structure**:
- **Return** Entity connected to **Return_Details** (which also connects to **Product**) and to **Customer**.
- **Cardinality and Ordinality** would be expressed with standard Chen notation lines and symbols to represent the relationships (crow's feet for many, single line for one).

### (b) Physical Database Tables

#### Tables:
1. **Product**:
   - `SKU` (PK)
   - `Description`
   - `Brand`

2. **Customer**:
   - `Customer_ID` (PK)
   - `Name`
   - `Address`
   - `Date_of_Birth`
   - `Telephone_Number`
   - `Email`

3. **Return**:
   - `Return_ID` (PK)
   - `Return_Date`
   - `Payment_Method`
   - `Customer_ID` (FK)

4. **Return_Details**:
   - `Return_ID` (FK)
   - `SKU` (FK)
   - `Quantity_Returned`
   - `Unit_Price`
   - `Motive`
   - Primary Key (PK): (`Return_ID`, `SKU`)

Each table is designed to hold the necessary attributes as described. Foreign keys are used to establish relationships between tables. The `Return_Details` table uses a composite primary key that includes both `Return_ID` and `SKU` to uniquely identify each item within a return.

### (c) Sample SQL Code for Insert

```sql
INSERT INTO Return (Return_ID, Return_Date, Payment_Method, Customer_ID)
VALUES (1, '2023-10-04', 'Credit Card', 10);

INSERT INTO Return_Details (Return_ID, SKU, Quantity_Returned, Unit_Price, Motive)
VALUES (1, 'SKU1234', 2, 29.99, 'Damaged item');
```

These queries respect the types and constraints, assuming types are correctly defined in the schema creation process.

### (d) SQL Code for Return Queries

```sql
SELECT COUNT(*)
FROM Return
WHERE Customer_ID = 10 AND Payment_Method = 'Credit Card';
```

This SQL query counts the number of returns made by a customer with the ID of 10 that were paid with a "Credit Card". It directly queries the `Return` table, filtering by `Customer_ID` and `Payment_Method`.



Here’s how to address the SQL queries based on the relational schema provided for a student module grading system:

### (a) SQL to List Modules Taken by Each Student

This query will list all modules (by title) taken by each student (by name), including the grade obtained, but excluding students without any module enrollments and modules without students:

```sql
SELECT s.firstname, s.surname, m.title, stm.grade
FROM student s
JOIN student_takes_module stm ON s.idstudent = stm.idstudent
JOIN module m ON stm.idmodule = m.idmodule;
```

This query uses `JOIN` operations to link the tables based on foreign key relationships and retrieves the required information.

### (b) SQL View for Lecturer Module Grade Averages

This view will list all lecturers and the average grade of the modules they teach:

```sql
CREATE VIEW LecturerGradeAverages AS
SELECT l.firstname, l.surname, m.title, AVG(stm.grade) AS average_grade
FROM lecturer l
JOIN module m ON l.idlecturer = m.idlecturer
JOIN student_takes_module stm ON m.idmodule = stm.idmodule
GROUP BY l.firstname, l.surname, m.title;
```

This view joins the `lecturer`, `module`, and `student_takes_module` tables to compute the average grade for each module by lecturer, grouped by lecturer and module title.

### (c) Trigger to Check Lecturer Salary

This trigger checks and sets the salary of a new lecturer to zero if it is initially negative:

```sql
CREATE TRIGGER CheckSalaryBeforeInsert
BEFORE INSERT ON lecturer
FOR EACH ROW
BEGIN
  IF NEW.salary < 0 THEN
    SET NEW.salary = 0;
  END IF;
END;
```

This trigger is set to activate before a new record is inserted into the `lecturer` table. It modifies the salary field in the new row if its value is negative.

### (d) Third Normal Form Check

The schema provided likely adheres to the Third Normal Form (3NF) if the following conditions are met:

- All entities (tables) are in Second Normal Form (2NF), meaning there are no partial dependencies of non-prime attributes on any candidate key.
- All attributes in each table are dependent only on the primary key and not on any other non-prime attribute (no transitive dependencies).

**Assessment based on visible schema:**
- The `student`, `module`, and `lecturer` tables seem to have attributes that depend only on their primary keys (`idstudent`, `idmodule`, `idlecturer` respectively), indicating no transitive dependencies are present.
- The `student_takes_module` table acts as a junction table with attributes depending only on the composite key (`idstudent`, `idmodule`), which is typical in many-to-many relationships between `student` and `module`.

This schema is likely in 3NF, provided that all non-key attributes in each table do not depend on other non-key attributes. This eliminates redundancy and maintains data integrity, ensuring that updates to the data do not lead to anomalies or require changes in multiple places for a single piece of information.


Let's address each part of your query based on the provided image:

### 1.a) Issues with using files for data persistence and how a database can address these issues

**Issues with Using Files for Data Persistence:**
1. **Concurrency:** Managing simultaneous access by multiple users is problematic with file systems, as they do not inherently support concurrent user access to the same data file.
2. **Data Redundancy and Inconsistency:** With file systems, it is easy to have data duplication, and changes in one file may not propagate to duplicates, leading to inconsistency.
3. **Security:** File systems generally provide limited security options for data access control.
4. **Data Integrity:** Ensuring data integrity is complex because file systems lack support for enforcing data rules beyond basic file permissions.
5. **Backup and Recovery:** Effective and efficient backup and recovery processes are not typically built into file systems, which can make restoring data more difficult.

**How Databases Address These Issues:**
1. **Concurrency:** Databases are designed to handle multiple users accessing the same data simultaneously, using sophisticated locking and transaction controls.
2. **Data Integrity:** Databases enforce data integrity through constraints (like primary keys, foreign keys, unique, and check constraints).
3. **Reduced Redundancy:** Normalization processes in databases reduce redundancy, ensuring data is stored only once.
4. **Security:** Databases provide robust security features, including user authentication and authorization down to row and column levels.
5. **Backup and Recovery:** Databases include tools and features that support regular backups, point-in-time recovery, and logging transactions.

### 1.b) Identify which of the following SQL statements are DML:

DML (Data Manipulation Language) statements are used for adding, deleting, and modifying data in a database. Based on the options given:
- **DELETE FROM Customers;** (DML - deletes data)
- **SELECT * FROM Customers;** (DML - queries data)
- **CREATE VIEW Cust_View AS SELECT * FROM Customers;** (DDL - defines data structures)
- **DROP TABLE IF EXISTS Customers;** (DDL - modifies database structure)
- **SELECT * FROM Cust_View;** (DML - queries data)

So, the DML statements here are i, ii, and v.

### 1.c) Data independence and the importance of this separation

**Data Independence:**
Data independence is the capacity to change the schema at one level of a database system without having to change the schema at the next higher level. There are two types:
- **Logical Data Independence:** The ability to modify the logical schema without altering the external schema or application programs. For example, changing the structure of a table (like adding a column) without affecting how user applications interact with the table.
- **Physical Data Independence:** The ability to modify the physical schema without changing the logical schema. For example, changing how data is stored on disks that does not affect the table structure seen by the user.

**Importance of Data Independence:**
1. **Flexibility:** Allows the database to change without necessitating changes in the applications that access it.
2. **Reduced Maintenance Costs:** Changes in some parts of the schema do not require changes in all application programs, thus reducing maintenance costs.
3. **Impact Isolation:** Changes at one level do not affect other levels, thus limiting the impact of changes and reducing the ripple effect of modifications.

This concept is crucial for the longevity and adaptability of database systems, ensuring that applications built on top of the database can continue to function efficiently even as changes are made to how data is stored or structured.



Let's address each of your questions based on the content in the image:

### 1.d) What is a weak entity?
In an Entity-Relationship Diagram (ERD) following the Chen notation, a weak entity is represented as a rectangle with an inner border. A weak entity is a type of entity that cannot be uniquely identified by its own attributes alone; it relies on a foreign key in addition to its own attributes to form a primary key, typically because it has a dependency on another entity (referred to as the owner or strong entity).

**Example:**
Consider an entity `Order`. Each `Order` can have multiple `OrderDetails` (specific items within the order). Here, `OrderDetails` would be the weak entity because it cannot be uniquely identified without the `Order` entity, which it is associated with. Each `OrderDetail` might have an attribute like `ItemNumber`, but this number only makes sense in the context of its specific `Order`.

### 1.e) Concept of a candidate key
A candidate key is an attribute, or a set of attributes, that can uniquely identify a tuple (row) in a table and thus can potentially serve as the primary key of the table. Every table might have one or more candidate keys, but only one of these gets selected as the primary key.

**Example:**
In a table `Employees` with columns `EmployeeID`, `SSN`, `Email`, and `PhoneNumber`, both `EmployeeID` and `SSN` could serve as candidate keys because each one uniquely identifies an employee. However, typically `EmployeeID` might be chosen as the primary key because it is system generated and guaranteed to be unique.

### 1.f) Advantages of using views
A view in SQL is a virtual table based on the result-set of an SQL statement. It contains rows and columns, just like a real table. The fields in a view are fields from one or more real tables in the database.

**Advantages:**
- **Security**: Views can restrict access to certain data, allowing users to access only specific rows or columns of data.
- **Simplicity**: Views can simplify the complexity of data by presenting a different, often simpler structure to the user, hiding the complexity of underlying data joins.
- **Data Integrity**: Views can be used to ensure data integrity through the use of functions, group by, and clauses to show data that fulfills certain conditions.
- **Query Efficiency**: Repeatedly used complex queries can be encapsulated in views for efficiency and convenience.

### 1.g) Basic operation of a trigger
A trigger in a relational database is a procedural code that is automatically executed in response to certain events on a particular table or view. Triggers are used to maintain the integrity of the data across tables.

**Operations:**
- **Before Triggers**: Execute before a specified operation (e.g., insert, update, or delete).
- **After Triggers**: Execute after the specified operation has been completed.
- **Instead Of Triggers**: Execute in place of an operation.

**Example Problem Solved:**
A trigger can automatically update the `ModifiedDate` column of a `Customers` table whenever data in a row is updated. This helps in maintaining accurate and automated record-keeping without requiring explicit action from the user.

### 1.h) Explanation of transactions with example
A transaction in SQL is a sequence of operations performed as a single logical unit of work. A transaction must either complete in its entirety or not at all, which is ensured through the capabilities to commit (save the changes) or rollback (undo changes) the transaction.

**Example:**
Consider a banking system where you need to transfer $100 from Account A to Account B. This involves two steps: debiting Account A and crediting Account B. These steps need to be executed as part of a single transaction:
```sql
BEGIN TRANSACTION;
UPDATE Accounts SET balance = balance - 100 WHERE accountID = 'A';
UPDATE Accounts SET balance = balance + 100 WHERE accountID = 'B';
IF @@ERROR != 0
    ROLLBACK TRANSACTION;
ELSE
    COMMIT TRANSACTION;
```
This ensures that if either operation fails, the entire transaction will roll back, maintaining the integrity of the financial data.

Each part of your query involves foundational concepts of database management that are crucial for designing robust, secure, and efficient databases.


Let's tackle each SQL query as requested based on the database schema provided in the image.

### 2.a) SQL Statement for Students and Their Addresses
This query requires joining the `Students` and `Address` tables and displaying NULL for students without an address.

```sql
SELECT 
    s.student_id, 
    s.firstname, 
    s.lastname, 
    s.student_number,
    a.street,
    a.city,
    a.zipcode,
    a.country
FROM Students s
LEFT JOIN Address a ON s.student_id = a.fk_student_id;
```

### 2.b) SQL Statement for a VIEW - ListModules for Course DT228
This view displays the course ID, course title, module title, and module description for a specific course (DT228).

```sql
CREATE VIEW ListModules AS
SELECT 
    c.course_id, 
    c.course_title, 
    m.module_title, 
    m.module_description
FROM Courses c
JOIN Modules m ON c.course_id = m.fk_course_id
WHERE c.course_id = 'DT228';
```

### 2.c) SQL Statement to Create a List of Courses and Their Module Counts
This query lists all courses and the number of modules on each course, storing the results in a temporary table called `TmpModuleCount`.

```sql
SELECT 
    c.course_id, 
    c.course_title,
    COUNT(m.module_id) AS module_count
INTO TmpModuleCount
FROM Courses c
LEFT JOIN Modules m ON c.course_id = m.fk_course_id
GROUP BY c.course_id, c.course_title;
```

In these examples:
- **2.a)** uses a `LEFT JOIN` to ensure all students are listed, even those without an associated address, substituting `NULL` where no address exists.
- **2.b)** defines a view that filters and presents data specifically for course DT228, showing relevant module details.
- **2.c)** uses an aggregate function (`COUNT`) to determine the number of modules per course and employs the `INTO` clause to store results in a temporary table.

These SQL statements are designed to work with most SQL database systems, though specifics such as temporary table syntax might vary slightly depending on the SQL dialect (e.g., SQL Server, PostgreSQL, MySQL). Make sure to adjust the syntax to fit the specific SQL environment you are using.



### 3.a) Description of First, Second, and Third Normal Forms

#### **First Normal Form (1NF)**
**Definition:**
A table is in 1NF if it has no repeating groups or arrays. Essentially, each column must contain only atomic (indivisible) values, and each row should contain a unique identifier (primary key).

**Example:**
Consider a table with data about music albums where some rows have multiple genres listed in a single column:
```
AlbumID | AlbumName           | Genres
--------|---------------------|-----------
1       | Thriller            | Pop, Rock
2       | Back in Black       | Rock
```
This table is not in 1NF because the `Genres` column contains non-atomic values. To bring the table to 1NF:
```
AlbumID | AlbumName           | Genre
--------|---------------------|-------
1       | Thriller            | Pop
1       | Thriller            | Rock
2       | Back in Black       | Rock
```

#### **Second Normal Form (2NF)**
**Definition:**
A table is in 2NF if it is in 1NF and all non-key attributes are fully dependent on the primary key. There should be no partial dependency, where a column is dependent only on part of a composite primary key.

**Example:**
Using the previous 1NF example, assume we now have album details including artist and release date:
```
AlbumID | AlbumName           | Genre  | Artist         | ReleaseDate
--------|---------------------|--------|----------------|------------
1       | Thriller            | Pop    | Michael Jackson| 1982-11-30
1       | Thriller            | Rock   | Michael Jackson| 1982-11-30
2       | Back in Black       | Rock   | AC/DC          | 1980-07-25
```
This table is in 1NF but not in 2NF because `Artist` and `ReleaseDate` are dependent only on `AlbumID` and not on `Genre`. To bring the table to 2NF:
```
Albums Table:
AlbumID | AlbumName           | Artist         | ReleaseDate
--------|---------------------|----------------|------------
1       | Thriller            | Michael Jackson| 1982-11-30
2       | Back in Black       | AC/DC          | 1980-07-25

Genres Table:
AlbumID | Genre
--------|------
1       | Pop
1       | Rock
2       | Rock
```

#### **Third Normal Form (3NF)**
**Definition:**
A table is in 3NF if it is in 2NF and no non-key attribute is dependent on another non-key attribute (transitive dependency).

**Example:**
Using the 2NF example above, suppose we include a column for `ArtistBirthYear` in the Albums table:
```
Albums Table:
AlbumID | AlbumName           | Artist         | ReleaseDate  | ArtistBirthYear
--------|---------------------|----------------|--------------|----------------
1       | Thriller            | Michael Jackson| 1982-11-30   | 1958
2       | Back in Black       | AC/DC          | 1980-07-25   | NULL
```
`ArtistBirthYear` is dependent on `Artist`, which is a non-key attribute. This is a transitive dependency. To bring the table to 3NF, we separate artist information:
```
Albums Table:
AlbumID | AlbumName           | Artist         | ReleaseDate
--------|---------------------|----------------|------------
1       | Thriller            | Michael Jackson| 1982-11-30
2       | Back in Black       | AC/DC          | 1980-07-25

Artists Table:
Artist         | BirthYear
---------------|----------
Michael Jackson| 1958
AC/DC          | NULL
```

### 3.b) Constructing an ERD in Chen Notation

For the music DJ application, here is a conceptual ERD based on Chen notation:
- **Entities**:
  - **Album**: Attributes include `AlbumID`, `Title`, `ReleaseDate`. Related to `Genre`, `Artist`, and `Track`.
  - **Artist**: Attributes include `ArtistID`, `ArtistName`.
  - **Genre**: Attributes include `GenreID`, `GenreName`.
  - **Track**: Attributes include `TrackID`, `TrackTitle`.
  - **Playlist**: Attributes include `PlaylistID`, `PlaylistName`.
- **Relationships**:
  - **Album** has a many-to-many relationship with **Genre**.
  - **Album** has a many-to-one relationship with **Artist**.
  - **Album** has a one-to-many relationship with **Track**.
  - **Playlist** has a many-to-many relationship with **Track**.


### 1.a) Issues with Using Files for Data Persistence and Database Solutions

**Issues with Files for Data Persistence:**
1. **Concurrency**: Handling concurrent access by multiple users is problematic, leading to potential data corruption or access conflicts.
2. **Data Redundancy**: Data can easily be duplicated in multiple files, leading to inconsistencies.
3. **Data Integrity**: Maintaining data integrity is challenging because files lack the mechanisms to enforce data constraints.
4. **Scalability**: Scaling a file-based system to handle larger datasets efficiently is difficult.
5. **Security**: File-based systems generally provide limited security features to control access to data.

**Database Solutions:**
- **Concurrency Control**: Databases manage concurrent access efficiently through locking and transactions, ensuring data consistency.
- **Reduced Redundancy**: Normalization in databases helps reduce redundancy and inconsistency.
- **Integrity Constraints**: Databases enforce data integrity via constraints (e.g., primary keys, foreign keys).
- **Scalability**: Databases are designed to handle large volumes of data efficiently, with capabilities like indexing to improve query performance.
- **Advanced Security**: Databases offer comprehensive security features, including role-based access controls.

### 1.b) DDL and DML in SQL

**DDL (Data Definition Language)**
- **Purpose**: Used to define and modify database schema and structure.
- **Common Statements**: `CREATE`, `ALTER`, `DROP`.
- **Examples**: 
  - `CREATE TABLE` to create new tables.
  - `DROP TABLE` to delete tables.
  - `ALTER TABLE` to modify existing table structure (e.g., adding a column).

**DML (Data Manipulation Language)**
- **Purpose**: Used to retrieve and manipulate data within the existing database structures.
- **Common Statements**: `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
- **Examples**:
  - `SELECT` to query data from tables.
  - `INSERT` to add new records.
  - `UPDATE` to modify existing data.
  - `DELETE` to remove data.

### 1.c) Concept of Physical and Logical Data Independence

**Physical Data Independence**:
- **Definition**: The ability to modify the physical schema without affecting the logical schema.
- **Importance**: Enables changes in storage and access methods without altering the conceptual view of data, which means applications built on the database do not need to be changed when modifications are made to how data is stored.

**Logical Data Independence**:
- **Definition**: The ability to change the logical schema without altering the external schemas or application programs.
- **Importance**: Facilitates changes to the logical schema (like adding a new field or table) without affecting the application's ability to access data, ensuring application stability during database evolution.

### 1.d) Benefits of the ER Model in Database Design

**Benefits of Using the ER Model:**
1. **Visual Representation**: Provides a clear graphical representation of the database structure, making it easier to understand and communicate the database design.
2. **Simplifies Design Process**: Helps in organizing and structuring data requirements systematically before actual database creation, reducing complexity and errors.
3. **Facilitates Database Normalization**: By identifying entities, their relationships, and attributes clearly, the ER model supports the normalization process to optimize database structure.
4. **Enhances Data Integrity**: The model explicitly defines relationships and constraints, which helps in implementing data integrity in the actual database.
5. **Scalability and Flexibility**: Makes it easier to add new data and modify existing structures without significant disruptions, supporting the scalability and evolution of the database system.

The ER model serves as a foundational tool in database design, providing a conceptual framework that helps database designers visualize and construct a database architecture that is robust, efficient, and scalable.

.### 1.e) Concept of a Superkey

A **superkey** is a set of one or more attributes that, taken collectively, can uniquely identify a tuple (row) in a table. A superkey may include attributes that are not necessary for unique identification. It is a broader concept compared to a primary key, which is a minimal superkey that cannot have any redundant information.

**Example:**
Consider a table `Students` with columns `StudentID`, `StudentEmail`, `FirstName`, and `LastName`. Here:
- `StudentID` alone can uniquely identify a student, making it a superkey.
- The combination of `StudentEmail` and `FirstName` could also uniquely identify a student (assuming no two students with the same name share an email), so this combination is another superkey.
- A primary key would typically be `StudentID` because it is minimal and sufficient to identify each record uniquely.

### 1.f) Advantages and Disadvantages of Using Stored Procedures

**Advantages:**
1. **Performance**: Stored procedures are compiled once and stored in executable form, which can result in performance improvements as they are reused.
2. **Reduced Network Traffic**: Executing stored procedures can reduce network traffic because only calls and specific data are transmitted rather than batches of SQL statements.
3. **Reusability and Maintainability**: Stored procedures can be reused across different programs and applications, promoting consistency and ease of maintenance.
4. **Security**: They help enhance security by restricting direct access to data and allowing execution through controlled interfaces.

**Disadvantages:**
1. **Debugging Difficulty**: Debugging stored procedures can be more challenging compared to other forms of code, especially when complex logic is involved.
2. **Database Dependency**: Using stored procedures can increase dependency on the specific database and its version, potentially leading to issues with portability between different database systems.
3. **Complexity**: Maintaining complex stored procedures can become difficult, especially as changes in business logic or database structure occur.

### 1.g) Concept of Referential Integrity

**Referential integrity** is a database concept that ensures relationships between tables remain consistent. It is typically enforced using foreign keys. This means that any foreign key field must agree with the primary key that is referenced by the foreign key.

**Example:**
Consider two tables, `Orders` and `Customers`:
- `Customers` has a primary key `CustomerID`.
- `Orders` includes a foreign key `CustomerID` that references `Customers.CustomerID`.

Referential integrity ensures that every `CustomerID` in the `Orders` table must also exist in the `Customers` table. This prevents scenarios such as an order being associated with a non-existent customer.

### 1.h) Description of an Atomic Transaction

An **atomic transaction** in database management is a sequence of operations that are treated as a single unit. This transaction must either be fully completed or not executed at all, which means it adheres to an "all or nothing" rule. This is crucial for maintaining data integrity.

**Example:**
Consider a banking system where you want to transfer $100 from Alice's account to Bob's account:
1. **Debit $100 from Alice's account.**
2. **Credit $100 to Bob's account.**

Both operations must be executed together as part of a single transaction:
- If both steps complete successfully, the transaction commits and the changes are permanently saved.
- If any step fails, the entire transaction rolls back, and both accounts remain unchanged.

This ensures that the database state is always consistent, even in cases of a system crash or power failure during the transaction.



Let's address each of the SQL tasks based on the database schema provided:

### 2.a) SQL Statement to List All Customers and Their Addresses

This statement will join the `Customers` and `Address` tables and display all columns from both tables, using a `LEFT JOIN` to include customers who might not have an address, in which case address fields will show as `NULL`.

```sql
SELECT 
    c.customer_id, 
    c.firstname, 
    c.lastname, 
    a.street, 
    a.city, 
    a.county, 
    a.country
FROM Customers c
LEFT JOIN Address a ON c.customer_id = a.fk_customer_id;
```

### 2.b) SQL Statement to Create a VIEW Named ListOrders

This view will list all orders along with the order ID, order date, and customer's name. It requires joining the `Orders` table with the `Customers` table to fetch the customer's name.

```sql
CREATE VIEW ListOrders AS
SELECT 
    o.order_id, 
    o.order_date, 
    CONCAT(c.firstname, ' ', c.lastname) AS customer_name
FROM Orders o
JOIN Customers c ON o.fk_customer_id = c.customer_id;
```

### 2.c) SQL Statement to List All Orders and the Total Price of Each Order

This query needs to calculate the sum of product prices for each order. It involves a join among `Orders`, `Product_Order`, and `Products`, and grouping the results by order ID to sum the prices.

```sql
SELECT 
    o.order_id, 
    o.order_date, 
    SUM(p.price * po.amount) AS total_price
INTO TmpListOrders
FROM Orders o
JOIN Product_Order po ON o.order_id = po.fk_order_id
JOIN Products p ON po.fk_product_id = p.product_id
GROUP BY o.order_id, o.order_date;
```

In this query:
- `p.price * po.amount` computes the total price for each product in an order by multiplying the unit price by the quantity.
- `INTO TmpListOrders` stores the result into a temporary table called `TmpListOrders`.
- It is assumed that `price` in the `Products` table represents the unit price of the product and `amount` in the `Product_Order` table represents the quantity of each product ordered.

Each SQL statement provided is tailored to fulfill the requirements based on the schema and uses standard SQL syntax. Adjustments may be necessary depending on the specific SQL dialect and database system being used (like MySQL, PostgreSQL, SQL Server, etc.).



### 3.a) Conversion to Third Normal Form (3NF)

**Original Table:**

| student_name | student_number | course_id | course                  | modules                      |
|--------------|----------------|-----------|-------------------------|------------------------------|
| John Dunne   | DIT45623       | DT228     | Undergraduate Full Time | Program Design               |
| Jane McCarthy| DIT92458       | DT249     | Undergraduate Part Time | Database Systems             |
| Tom Jones    | DIT17032       | DT255     | Undergraduate Full Time | Database Systems             |
| Sarah Murray | DIT82603       | DT265     | Postgraduate Part Time  | Object Oriented Programming  |

**Normalization Process:**

1. **First Normal Form (1NF)**
   - The table is already in 1NF as each column contains atomic values and each row is unique.

2. **Second Normal Form (2NF)**
   - To achieve 2NF, we need to remove partial dependencies (dependencies of non-key attributes on a part of the primary key).
   - Assuming `(student_number, course_id)` is a composite key for this table, no partial dependency exists since no non-key attribute is dependent on a part of the key alone.

3. **Third Normal Form (3NF)**
   - A table is in 3NF if it is in 2NF and all non-key attributes are non-transitively dependent on the primary key.
   - In the original table, `course` can be considered dependent on `course_id`, and `modules` can also be considered dependent on `course_id`.

**Normalized Tables:**

- **Students Table**
  | student_number | student_name |
  |----------------|--------------|
  | DIT45623       | John Dunne   |
  | DIT92458       | Jane McCarthy|
  | DIT17032       | Tom Jones    |
  | DIT82603       | Sarah Murray |

- **Courses Table**
  | course_id | course                  |
  |-----------|-------------------------|
  | DT228     | Undergraduate Full Time |
  | DT249     | Undergraduate Part Time |
  | DT255     | Undergraduate Full Time |
  | DT265     | Postgraduate Part Time  |

- **Enrollments Table**
  | student_number | course_id | modules                      |
  |----------------|-----------|------------------------------|
  | DIT45623       | DT228     | Program Design               |
  | DIT92458       | DT249     | Database Systems             |
  | DIT17032       | DT255     | Database Systems             |
  | DIT82603       | DT265     | Object Oriented Programming  |

**Justification for 3NF:**
- Each table now only contains data that is dependent on the key to that table.
- The `Students Table` and `Courses Table` remove redundant data and ensure that changes in course details or student names need only be updated in one place, maintaining data integrity.

### 3.b) ERD for Banking System Requirements

**Entities and Attributes:**
- **Customer**
  - Attributes: CustomerID (PK), FirstName, LastName, Address, PinNumber
- **Account**
  - Attributes: AccountNumber (PK), AccountType, Balance
- **Transaction**
  - Attributes: TransactionID (PK), Type, Amount, Date
- **ATM**
  - Attributes: ATMID (PK), Location

**Relationships:**
- **Customer-Account Relationship**
  - One-to-Many: One customer can have multiple accounts.
- **Account-Transaction Relationship**
  - One-to-Many: One account can have multiple transactions.
- **ATM-Transaction Relationship**
  - One-to-Many: One ATM can handle multiple transactions, but each transaction occurs at one ATM.

**ER Diagram Description:**
- The diagram would feature each entity connected by lines indicating their relationships. Attributes would be listed within each entity.
- Chen notation would involve rectangles for entities, ovals for attributes directly connected to their entities, diamonds for relationships, and lines to connect relationships with entities.
- Cardinality labels (1:1, 1:M, M:N) near the connection lines indicate the nature of relationships.

This ERD would effectively model the system, showing the structural relationships between customers, their bank accounts, the transactions they perform, and the ATMs where transactions occur.

