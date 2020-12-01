# Generated by Django 3.1.2 on 2020-11-30 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('analysis', '0004_auto_20201114_1452'),
    ]

    operations = [
        migrations.RenameField(
            model_name='distribution',
            old_name='EF',
            new_name='RT',
        ),
        migrations.RenameField(
            model_name='userreport',
            old_name='EF_probability',
            new_name='RT_probability',
        ),
        migrations.RemoveField(
            model_name='userreport',
            name='EF_prediction',
        ),
        migrations.AddField(
            model_name='userreport',
            name='RT_prediction',
            field=models.IntegerField(choices=[(1, 'Um'), (2, 'Ti'), (3, 'Rt'), (4, 'Jc')], default=0),
        ),
        migrations.AddField(
            model_name='userreport',
            name='mean_elapsed_time',
            field=models.FloatField(default=30.0),
        ),
        migrations.AddField(
            model_name='userreport',
            name='mean_erase_cnt',
            field=models.IntegerField(default=10),
        ),
        migrations.AddField(
            model_name='userreport',
            name='solution3',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='userreport',
            name='JC_prediction',
            field=models.IntegerField(choices=[(1, 'Um'), (2, 'Ti'), (3, 'Rt'), (4, 'Jc')], default=0),
        ),
        migrations.AlterField(
            model_name='userreport',
            name='TI_prediction',
            field=models.IntegerField(choices=[(1, 'Um'), (2, 'Ti'), (3, 'Rt'), (4, 'Jc')], default=0),
        ),
        migrations.AlterField(
            model_name='userreport',
            name='UM_prediction',
            field=models.IntegerField(choices=[(1, 'Um'), (2, 'Ti'), (3, 'Rt'), (4, 'Jc')], default=0),
        ),
        migrations.AlterField(
            model_name='userreport',
            name='solution1',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='userreport',
            name='solution2',
            field=models.TextField(default=''),
        ),
    ]
