from django.shortcuts import render
from django.views.generic import View


# Create your views here.


class IndexView(View):
    """首页"""

    def get(self, request):
        return render(request, 'index.html')

    def post(self, request):
        pass


def supervisor(request):
    return render(request, 'supervisor.html')


def dispute(request):
    return render(request, 'dispute.html')