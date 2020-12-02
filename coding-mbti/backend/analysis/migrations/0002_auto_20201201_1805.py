# Generated by Django 3.1.2 on 2020-12-01 18:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('problem', '0001_initial'),
        ('group', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('analysis', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userreport',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='solutionreport',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='solutionreport',
            name='solution',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='problem.solution'),
        ),
        migrations.AddField(
            model_name='problemreport',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='problemreport',
            name='distribution',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='analysis.distribution'),
        ),
        migrations.AddField(
            model_name='problemreport',
            name='problem',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='problem.problem'),
        ),
        migrations.AddField(
            model_name='groupreport',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='groupreport',
            name='distribution',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='analysis.distribution'),
        ),
        migrations.AddField(
            model_name='groupreport',
            name='group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='group.group'),
        ),
        migrations.AddField(
            model_name='globalreport',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='globalreport',
            name='distribution',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='analysis.distribution'),
        ),
    ]