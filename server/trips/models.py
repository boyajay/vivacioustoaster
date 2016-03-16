from __future__ import unicode_literals

from django.db import models

# Create your models here.
class User(models.Model):
  facebook_id = models.CharField(max_length=100)
  name = models.CharField(max_length=100)
  picUrl = models.CharField(max_length=100)




