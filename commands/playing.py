import discord
import random
from discord.ext import commands


class Playing(commands.Cog):
    def __init__(self, client):
        self.client = client

    # commands
    @commands.command(aliases=['status-game', 'status-playing'])
    @commands.is_owner()
    async def playing(self, ctx, status='!help | DriedSponge.net'):
        await self.client.change_presence(activity=discord.Game(name=status))

    @playing.error
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.MissingRequiredArgument):
            await ctx.send(f'{ctx.author.mention} Please specify what to change the status to.')


def setup(client):
    client.add_cog(Playing(client))
