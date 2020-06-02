import discord
import random
from discord.ext import commands


class UserJoin(commands.Cog):
    def __init__(self, client):
        self.client = client

    # events
    @commands.Cog.listener()
    async def on_ready(self):
        print('Bot Is ready via cog')


def setup(client):
    client.add_cog(UserJoin(client))
