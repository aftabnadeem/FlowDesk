# invoices/models.py
from django.db import models
from django.contrib.auth.models import User


class Client(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="clients")
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Base price

    def __str__(self):
        return self.name


class Invoice(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('sent', 'Sent'),
        ('paid', 'Paid'),
        ('cancelled', 'Cancelled'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="invoices")
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="invoices")
    date = models.DateField(auto_now_add=True)
    due_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")
    notes = models.TextField(blank=True, null=True)
    discount = models.DecimalField(
        max_digits=10, decimal_places=2, default=0
    )  # Invoice-level discount (flat amount)

    def __str__(self):
        return f"Invoice {self.id} - {self.client.name}"

    @property
    def subtotal(self):
        return sum(item.total for item in self.items.all())

    @property
    def total_amount(self):
        return max(self.subtotal - self.discount, 0)  # Prevent negative totals


class InvoiceItem(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    discount = models.DecimalField(
        max_digits=10, decimal_places=2, default=0
    )  # Item-level discount (flat amount)

    @property
    def total(self):
        base = self.product.price * self.quantity
        return max(base - self.discount, 0)  # Prevent negative

    def __str__(self):
        return f"{self.product.name} (x{self.quantity})"
