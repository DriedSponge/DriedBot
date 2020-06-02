import discord
import random
from discord.ext import commands


class Example(commands.Cog):
    def __init__(self, client):
        self.client = client

    # events
    @commands.Cog.listener()
    async def on_ready(self):
        print('Bot Is ready via cog')

    # commands
    @commands.command(aliases=['8ball', 'eightball'])
    async def _8ball(self, ctx, *, question='am I cute'):
        responses = ['Yes',
                     'no',
                     'fuck you']

        await ctx.send(f'Question: {question}\nAnswer: {random.choice(responses)}')


def setup(client):
    client.add_cog(Example(client))
