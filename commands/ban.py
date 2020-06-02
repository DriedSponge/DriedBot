import discord
import random
from discord.ext import commands


class Ban(commands.Cog):
    def __init__(self, client):
        self.client = client

    # commands
    @commands.command()
    @commands.has_permissions(ban_members=True)
    async def ban(self, ctx, member: discord.Member, *, reason='None'):
        if str(ctx.channel.type) != 'private':
            await member.ban(reason=reason)
            embed = discord.Embed(title='Member Banned',
                                  description=f'{member.mention} has been banned from the server!',
                                  color=0xFF0000)
            await ctx.send(embed=embed)
        else:
            response = await ctx.send(f'Please use this command in one of the servers channels')
            await response.delete(delay=5)

    @ban.error
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.MissingRequiredArgument):
            await ctx.send(f'{ctx.author.mention} Please specify a member to ban')


def setup(client):
    client.add_cog(Ban(client))
