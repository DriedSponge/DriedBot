import discord
import random
from discord.ext import commands


class Ping(commands.Cog):
    def __init__(self, client):
        self.client = client

    # commands
    @commands.command()
    async def ping(self, ctx):
        if str(ctx.channel.type) != 'private':
            if ctx.channel.name == 'bot-cmds':
                embed = discord.Embed(title='Pong!',
                                      color=0x166CD4)
                embed.add_field(name='Ping', value=f'{round(self.client.latency * 1000)}ms')
                await ctx.send(embed=embed)
            else:
                await ctx.message.delete()
                response = await ctx.send(f'{ctx.author.mention} please use the <#717134361690112000> channel!')
                await response.delete(delay=5)
        else:
            response = await ctx.send(f'Please use this command in the <#717134361690112000> channel.')
            await response.delete(delay=5)


def setup(client):
    client.add_cog(Ping(client))
