# Generated by Django 4.2.15 on 2024-09-19 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Services', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='image',
            field=models.ImageField(height_field='160', upload_to='player_images/', width_field='160'),
        ),
    ]
