# Generated by Django 2.0.12 on 2023-06-08 17:55

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='KnowledgeBase',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fileName', models.CharField(max_length=255)),
                ('type', models.CharField(max_length=255)),
                ('size', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_activity', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'ordering': ['-fileName'],
            },
        ),
    ]
