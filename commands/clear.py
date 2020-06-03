import discord
import random
from discord.ext import commands


class Clear(commands.Cog):
    def __init__(self, client):
        self.client = client

    # commands
    @commands.command(aliases=['purge'])
    @commands.has_permissions(manage_messages=True)
    @commands.guild_only()
    async def clear(self, ctx, ammount: int):
        await ctx.channel.purge(limit=ammount)

    @clear.error
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.MissingRequiredArgument):
            await ctx.message.delete()
            response = await ctx.send(f'{ctx.author.mention} Please specify an ammount of messages to clear')
            await response.delete(delay=5)
        if isinstance(error, commands.BadArgument):
            await ctx.message.delete()
            response = await ctx.send(f'{ctx.author.mention} The ammount must be a number')
            await response.delete(delay=5)


def setup(client):
    client.add_cog(Clear(client))
