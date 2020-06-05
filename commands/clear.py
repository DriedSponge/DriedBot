import discord
import random
import datetime
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
        channel = self.client.get_channel(717958874820378624)
        embed = discord.Embed(title='Cleared Channel',
                              color=0x166CD4)
        embed.add_field(name='Moderator', value=ctx.author.mention, inline=True)
        embed.add_field(name='Channel', value=ctx.channel.mention, inline=True)
        embed.add_field(name='Message Count', value=str(ammount), inline=True)
        embed.timestamp = datetime.datetime.utcnow()
        await channel.send(embed=embed)

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
