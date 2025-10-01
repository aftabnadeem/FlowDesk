FlowDesk – All-in-One Business Management App

FlowDesk is a modular business management app built with Django REST Framework and React.
Manage clients, products, and invoices seamlessly, with future plans for GST invoicing, inventory management, manufacturing, and digital marketing tools.

🚀 Features

Client Management – Add, edit, and delete clients.

Product Management – Maintain products with pricing and descriptions.

Invoicing – Create invoices with client details, products, quantities, discounts, and due dates.

JWT Authentication – Secure login with access and refresh tokens.

Private Routes – Only authenticated users can access management pages.

Future Roadmap: Inventory, GST-ready invoicing, financial analytics, digital marketing tools, and manufacturing workflows.

⚡ Tech Stack

Backend: Django REST Framework, Python, JWT Authentication

Frontend: React, Tailwind CSS

Database: PostgreSQL (or any relational database)

💻 Quick Start
# Clone the repository
git clone https://github.com/aftabnadeem/FlowDesk.git
cd FlowDesk

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend
cd ../frontend
npm install
npm start

📂 Structure
backend/         # Django backend
frontend/        # React frontend
services/        # Axios API services
components/      # Reusable UI components
pages/           # React pages (Login, Signup, Clients, Products, Invoices)

📄 Usage

Signup or login

Manage clients, products, and invoices

Future modules will expand functionality

🤝 Contributing

Fork the repo

Create a branch for your feature (git checkout -b feature-name)

Commit your changes (git commit -m "Add feature")

Push to your branch (git push origin feature-name)

Open a Pull Request

📜 License

MIT License
