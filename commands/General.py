import discord
import index
from discord.ext import commands


class General(commands.Cog):
    """General Commands"""
    def __init__(self, client):
        self.client = client

    # Ping
    @commands.command()
    @commands.check(index.InBotsChannel)
    @commands.guild_only()
    async def ping(self, ctx):
        embed = discord.Embed(title='Pong!',
                              color=0x166CD4)
        embed.add_field(name='Ping', value=f'{round(self.client.latency * 1000)}ms')
        await ctx.send(embed=embed)


def setup(client):
    client.add_cog(General(client))
