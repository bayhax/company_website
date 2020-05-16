from django.shortcuts import render
from django.views.generic import View
# Create your views here.


class AboutView(View):
    """关于我们"""

    def get(self, request):
        return render(request, 'about.html')

    def post(self, request):
        pass