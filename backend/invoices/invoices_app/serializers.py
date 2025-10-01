# invoices/serializers.py
from rest_framework import serializers
from .models import Client, Product, Invoice, InvoiceItem


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"
        read_only_fields = ["user"]


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ["user"]


class InvoiceItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source="product.name")
    total = serializers.ReadOnlyField()

    class Meta:
        model = InvoiceItem
        fields = ["id", "product", "product_name", "quantity", "discount", "total"]


class InvoiceSerializer(serializers.ModelSerializer):
    client_name = serializers.ReadOnlyField(source="client.name")
    items = InvoiceItemSerializer(many=True)
    subtotal = serializers.ReadOnlyField()
    total_amount = serializers.ReadOnlyField()

    class Meta:
        model = Invoice
        fields = [
            "id",
            "client",
            "client_name",
            "date",
            "due_date",
            "status",
            "notes",
            "discount",
            "subtotal",
            "total_amount",
            "items",
        ]
        read_only_fields = ["user"]

    def create(self, validated_data):
        items_data = validated_data.pop("items", [])
        invoice = Invoice.objects.create(**validated_data)
        for item_data in items_data:
            InvoiceItem.objects.create(invoice=invoice, **item_data)
        return invoice

    def update(self, instance, validated_data):
        items_data = validated_data.pop("items", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if items_data is not None:
            instance.items.all().delete()
            for item_data in items_data:
                InvoiceItem.objects.create(invoice=instance, **item_data)
        return instance
