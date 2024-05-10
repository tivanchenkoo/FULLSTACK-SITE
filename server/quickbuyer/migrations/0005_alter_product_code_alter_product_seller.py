# Generated by Django 4.0.8 on 2024-05-07 13:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quickbuyer', '0004_alter_product_code_alter_product_seller'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='code',
            field=models.IntegerField(default=379073),
        ),
        migrations.AlterField(
            model_name='product',
            name='seller',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='quickbuyer.user'),
            preserve_default=False,
        ),
    ]