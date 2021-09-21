# Generated by Django 3.2.7 on 2021-09-21 12:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sections', '0002_section_course'),
        ('units', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='unit',
            name='section',
            field=models.ForeignKey(blank=True, max_length=250, null=True, on_delete=django.db.models.deletion.CASCADE, to='sections.section'),
        ),
    ]
