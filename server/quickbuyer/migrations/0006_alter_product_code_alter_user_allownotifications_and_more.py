# Generated by Django 4.0.8 on 2024-05-08 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickbuyer', '0005_alter_product_code_alter_product_seller'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='code',
            field=models.IntegerField(default=111437),
        ),
        migrations.AlterField(
            model_name='user',
            name='allowNotifications',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='contact_mail',
            field=models.EmailField(max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.CharField(max_length=225, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='instagram',
            field=models.CharField(max_length=225, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(default='user201614', max_length=225),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='products',
            field=models.CharField(default=[], max_length=225),
        ),
        migrations.AlterField(
            model_name='user',
            name='region',
            field=models.CharField(default='Украина', max_length=22),
        ),
        migrations.AlterField(
            model_name='user',
            name='sold',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='telegram',
            field=models.CharField(max_length=225, null=True),
        ),
    ]