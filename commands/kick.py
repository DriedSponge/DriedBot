import discord
import random
from discord.ext import commands


class Kick(commands.Cog):
    def __init__(self, client):
        self.client = client

    # commands
    @commands.command()
    @commands.has_permissions(kick_members=True)
    async def kick(self, ctx, member: discord.Member, *, reason='None'):
        if str(ctx.channel.type) != 'private':
            await member.kick(reason=reason)
            embed = discord.Embed(title='Member Kicked',
                                  description=f'{member.mention} has been kicked from the server!',
                                  color=0xFF0000)
            await ctx.send(embed=embed)
        else:
            response = await ctx.send(f'Please use this command in one of the servers channels')
            await response.delete(delay=5)

    @kick.error
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.MissingRequiredArgument):
            await ctx.message.delete()
            response = await ctx.send(f'{ctx.author.mention} Please specify a member to kick')
            await response.delete(delay=5)


def setup(client):
    client.add_cog(Kick(client))
