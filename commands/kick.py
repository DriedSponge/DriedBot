import discord
import random
from discord.ext import commands


class Kick(commands.Cog):
    def __init__(self, client):
        self.client = client

    # commands
    @commands.command()
    @commands.has_permissions(kick_members=True)
    @commands.guild_only()
    async def kick(self, ctx, member: discord.Member, *, reason='None'):
        await member.kick(reason=reason)
        embed = discord.Embed(title='Member Kicked',
                              description=f'{member.mention} has been kicked from the server!',
                              color=0xFF0000)
        await ctx.send(embed=embed)

    @kick.error
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.MissingRequiredArgument):
            await ctx.send(f'{ctx.author.mention} Please specify a member to kick')
        if isinstance(error, commands.BadArgument):
            await ctx.send(f'{ctx.author.mention} Could not find member')

def setup(client):
    client.add_cog(Kick(client))
