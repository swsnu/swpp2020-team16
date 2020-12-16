# Generated by Django 3.1.2 on 2020-12-16 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='codingstyle',
            old_name='EF_value',
            new_name='RT_value',
        ),
        migrations.AlterField(
            model_name='codingstyle',
            name='style',
            field=models.IntegerField(choices=[(1, 'Utrj'), (2, 'Utrc'), (3, 'Uttj'), (4, 'Uttc'), (5, 'Uirj'), (6, 'Uirc'), (7, 'Uitj'), (8, 'Uitc'), (9, 'Mtrj'), (10, 'Mtrc'), (11, 'Mttj'), (12, 'Mttc'), (13, 'Mirj'), (14, 'Eirc'), (15, 'Mitj'), (16, 'Mitc')]),
        ),
    ]
