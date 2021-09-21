
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('courses/', include('courses.urls')),
    # path('sections/', include('sections.urls')),
    # path('units/', include('units.urls')),
    # path('films/', include('films.urls')),
    # path('tests/', include('tests.urls')),
    # path('admin/', admin.site.urls),
]
