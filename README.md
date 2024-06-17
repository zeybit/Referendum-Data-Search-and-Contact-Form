# Referendum-Data-Search-and-Contact-Form
This project is a web application that allows users to search for referendum data by province and submit a contact form.

### Installation

To install the project, run the following command:

```bash
git clone https://github.com/username/project-name.git
cd project-name
npm install
```

### Database

The project uses a MySQL database to store contact and referendum data. The database credentials are stored in the `.env` file.You should create a file like this ;
DB_HOST=localhost &nbsp
DB_USER=root &nbsp
DB_PASS=yourpassword &nbsp
DB_NAME=iletisim_formu


### Running the Application

To start the application, run the following command:

```bash
npm start
```

This will start the server and make the application available at `http://localhost:3000`.

**Usage**
-----

### Home Page

The home page allows users to search for referendum data by province. Users can enter a province name in the search form and click the "Ara" button to view the results.

### Contact Form

The contact form allows users to submit their name, email address, phone number, and message.

### Referendum Data

The referendum data is displayed in a table on the home page. The data includes the province, district, registered voters, votes cast, valid votes, invalid votes, yes votes, and no votes.

**License**
-------

This project is licensed under the MIT License.

**Technologies Used**
-------------------

* EJS (Embedded JavaScript) for templating
* Express.js for the server-side framework
* MySQL for the database
* CSS for styling
