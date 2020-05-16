from django.shortcuts import render
from django.views.generic import View
# Create your views here.


class GameView(View):
    """游戏宣传首页"""

    def get(self, request):
        return render(request, 'game.html')

    def post(self, request):
        pass