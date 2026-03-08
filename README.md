# TaskMaster – Web Based Task Management System

## Project Overview
TaskMaster is a web-based task management application designed to help users efficiently organize and manage their daily tasks. The system provides an interactive dashboard where users can create, search, categorize, and track tasks based on their status.

The application focuses on improving productivity by allowing users to plan their work, monitor deadlines, and maintain a clear view of their responsibilities. TaskMaster demonstrates the practical implementation of core web development technologies including **HTML, CSS, and JavaScript**, along with **DOM manipulation and modern UI design principles**.

The system categorizes tasks into **Today**, **Upcoming**, and **Completed**, allowing users to easily manage their workflow and keep track of pending work.

---

# Problem Statement
Managing tasks using traditional methods such as notebooks, sticky notes, or basic reminder applications can be inefficient and unorganized. Users may forget deadlines, lose important information, or struggle to manage multiple tasks simultaneously.

There is a need for a simple and interactive digital solution that allows users to easily organize tasks, monitor deadlines, and access their task information from a centralized dashboard.

---

# Proposed Solution
TaskMaster provides a digital platform where users can manage tasks efficiently through a web-based dashboard. The system allows users to:

- Add tasks with complete details
- Track deadlines
- Categorize tasks based on status
- Search tasks instantly
- Organize tasks in a structured interface

The system improves task visibility and productivity by providing a clean and user-friendly interface.

---

# Objectives of the Project
The main objectives of the project are:

1. To develop a web-based task management system.
2. To provide an organized dashboard for managing tasks.
3. To allow users to add tasks with title, description, due date, and time.
4. To implement task categorization such as Today, Upcoming, and Completed.
5. To provide search functionality for quick task access.
6. To create an interactive and user-friendly interface.
7. To apply core web development concepts in a practical project.

---

# Features
The TaskMaster application includes the following features:

### Task Creation
Users can create new tasks by entering:
- Task Title
- Description
- Due Date
- Time

### Task Categories
Tasks are automatically organized into categories:
- Today
- Upcoming
- Completed

### Task Dashboard
A centralized dashboard displays all tasks and allows users to manage them easily.

### Search Functionality
Users can search for tasks by typing keywords in the search bar.

### Filter and Sort
Tasks can be filtered or sorted to improve organization and accessibility.

### Popup Task Form
Tasks can be added through an interactive popup form.

### Google Authentication
The system integrates Google authentication APIs to allow secure login.

### Modern User Interface
The system uses modern fonts, icons, and layout designs to improve usability.

---

# Technologies Used

## Frontend Technologies
- **HTML5**
    - Used for structuring the web pages and dashboard layout.

- **CSS3**
    - Used for styling the user interface, including layout, colors, fonts, and responsiveness.

- **JavaScript (ES6)**
    - Used for implementing dynamic functionality such as task creation, searching, filtering, and DOM manipulation.

## Libraries and APIs
- **Google Sign-In API**
    - Used for authentication and user identification.

- **Google Fonts**
    - Used for modern typography.

- **Material Symbols**
    - Used for UI icons.

---

# System Architecture
The system follows a **frontend-based architecture** where the user interacts with the web interface, and JavaScript handles dynamic operations through DOM manipulation.

Workflow:

User Interface → JavaScript Logic → DOM Manipulation → Task Display

The architecture ensures that user interactions such as adding or searching tasks update the interface dynamically without reloading the page.

---

# Project Modules

## 1. User Authentication Module
This module manages user login using Google Sign-In. It authenticates the user and loads the dashboard with user-specific information.

## 2. Dashboard Module
The dashboard acts as the main interface where users can view and manage all their tasks. It contains the sidebar navigation, task container, and top navigation bar.

## 3. Task Management Module
This module allows users to create and manage tasks. Each task includes a title, description, due date, and time.

## 4. Task Filtering Module
Tasks are categorized based on their status:
- Today's tasks
- Upcoming tasks
- Completed tasks

This module helps users organize and prioritize their work.

## 5. Search Module
The search functionality allows users to quickly locate tasks by entering keywords in the search bar.

## 6. User Interface Module
This module handles the design and layout of the system including:
- Sidebar navigation
- Popup forms
- Task containers
- Icons and typography

---

# Course Outcome Mapping (Web Development)

| CO | Course Outcome | Application in Project |
|----|---------------|------------------------|
| CO1 | Introduction to HTML | Used HTML to structure the dashboard, menus, and task forms |
| CO2 | Text Formatting & Lists | Used headings, paragraphs, and lists for organizing interface elements |
| CO3 | Introduction to CSS | Used CSS for styling layout, fonts, colors, and components |
| CO4 | Display & Positioning in CSS | Used flexbox and positioning to organize the dashboard layout |
| CO6 | Basic JavaScript | Implemented dynamic task creation and user interactions |
| CO7 | DOM | Used DOM manipulation to dynamically add and update tasks |

---

# Project Structure

```
TaskMaster
│
├── html
│   └── dashboard.html
│
├── css
│   └── Dashboard.css
│
├── js
│   └── main.js
│
├── images
│   └── logo.png
│
└── README.md
```

---

# User Interface Components

## Sidebar Navigation
Contains navigation links:
- Today
- Upcoming
- Completed

## Top Navigation
Includes:
- Search bar
- Notifications icon
- Logout option

## Task Container
Displays all tasks dynamically.

## Task Popup Form
Allows users to enter task details and create new tasks.

---

# How to Run the Project

### Step 1
Clone the repository:

```
git clone https://github.com/yourusername/taskmaster.git
```

### Step 2
Navigate to the project directory:

```
cd taskmaster
```

### Step 3
Open the project:

Open `dashboard.html` in your browser.

---

# Future Enhancements

The following improvements can be added in future versions:

- Task priority levels
- Task notifications and reminders
- Mobile responsive design
- Database integration
- Multi-user collaboration
- Task sharing features
- Dark mode

---

# Advantages of the System

- Easy task organization
- User-friendly interface
- Faster task searching
- Improved productivity
- Digital task tracking
- Simple and lightweight implementation

---

# Limitations

- Currently frontend-based
- No database storage
- No offline support
- Limited user collaboration features

---

# Conclusion

The TaskMaster Task Management System successfully demonstrates how modern web development technologies can be used to create an interactive productivity tool. The system allows users to efficiently manage their tasks through a structured dashboard, dynamic task management, and user-friendly design.

The project highlights the practical application of **HTML, CSS, JavaScript, and DOM manipulation** in developing a real-world web application. With further improvements such as backend integration and notification systems, TaskMaster can evolve into a fully functional productivity platform.

---

# Author
Project developed as part of a **Web Development academic project**.
