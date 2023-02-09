# Generated by Django 4.1.5 on 2023-02-08 11:33

from django.db import migrations, models
import jsonfield.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SettingUserProfileInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_id', models.CharField(max_length=400)),
                ('org_name', models.CharField(max_length=400)),
                ('owner', models.CharField(max_length=400)),
                ('version', models.CharField(max_length=400)),
                ('new_version', models.CharField(max_length=400)),
                ('profile_info', jsonfield.fields.JSONField(default=dict)),
            ],
        ),
    ]
