# Generated by Django 3.1.2 on 2020-11-30 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('problem', '0014_auto_20201117_1003'),
    ]

    operations = [
        migrations.AlterField(
            model_name='problem',
            name='objective',
            field=models.IntegerField(choices=[(1, 'Um'), (2, 'Ti'), (3, 'Rt'), (4, 'Jc')]),
        ),
    ]
