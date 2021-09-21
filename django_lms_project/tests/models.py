from django.db import models
from units.models import Unit


class Test(models.Model):
    title = models.CharField(max_length=250, blank=True, null=True)
    subtitle = models.CharField(max_length=250, blank=True, null=True)
    unit = models.ForeignKey(
        Unit, blank=True, null=True, max_length=250, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'tests'