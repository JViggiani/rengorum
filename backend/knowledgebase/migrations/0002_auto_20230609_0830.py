# Generated by Django 2.0.12 on 2023-06-09 07:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('knowledgebase', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='knowledgebase',
            name='file',
            field=models.FileField(default='C:\\Users\\Josh\\Desktop\\coding\\rengorum\\files\\knowledgebase/default.txt', upload_to='C:\\Users\\Josh\\Desktop\\coding\\rengorum\\files\\knowledgebase/'),
        ),
        migrations.AlterField(
            model_name='knowledgebase',
            name='size',
            field=models.FloatField(),
        ),
    ]
