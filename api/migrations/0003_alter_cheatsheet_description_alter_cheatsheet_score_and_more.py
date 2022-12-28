# Generated by Django 4.1.3 on 2022-12-28 04:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_cheatsheet_description_alter_cheatsheet_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cheatsheet',
            name='description',
            field=models.CharField(blank=True, default='', max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='cheatsheet',
            name='score',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='cheatsheet',
            name='title',
            field=models.CharField(blank=True, default='', max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='line',
            name='section',
            field=models.ForeignKey(blank=True, default='', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='lines', to='api.section'),
        ),
        migrations.AlterField(
            model_name='line',
            name='snippet',
            field=models.CharField(blank=True, default='', max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='section',
            name='description',
            field=models.CharField(blank=True, default='', max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='section',
            name='title',
            field=models.CharField(blank=True, default='', max_length=500, null=True),
        ),
    ]
