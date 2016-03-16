from django.contrib import admin

# Register your models here.
from trips.models import User

class TripsAdmin(admin.ModelAdmin):
    fieldsets = [('User',{'fields': ['facebook_id','name','picUrl']}),]

admin.site.register(User, TripsAdmin)
