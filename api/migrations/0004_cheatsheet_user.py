# Generated by Django 4.1.3 on 2022-12-30 18:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0003_alter_cheatsheet_description_alter_cheatsheet_score_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cheatsheet',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
