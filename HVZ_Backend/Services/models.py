from django.db import models

class Player(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField( max_length=50)
    status = models.SmallIntegerField()
    tags = models.SmallIntegerField()
    image = models.TextField()