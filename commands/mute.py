import discord
import random
from discord.ext import commands


class Mute(commands.Cog):
    def __init__(self, client):
        self.client = client

    # commands
    @commands.command(aliases=['gag'])
    @commands.has_permissions(kick_members=True, manage_messages=True)
    @commands.guild_only()
    async def mute(self, ctx, member: discord.Member, *, reason='None'):
        role = ctx.guild.get_role(717783312709582889)
        if role in member.roles:
            await ctx.send(f'{ctx.author.mention} This user is already muted')
        else:
            await member.add_roles(role, reason=reason)
            embed = discord.Embed(title='Member Muted',
                                  description=f'{member.mention} has been muted!',
                                  color=0xFFA800)
            await ctx.send(embed=embed)

    @mute.error
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.MissingRequiredArgument):
            await ctx.send(f'{ctx.author.mention} Please specify a member to mute')
        if isinstance(error, commands.BadArgument):
            await ctx.send(f'{ctx.author.mention} Could not find member')


def setup(client):
    client.add_cog(Mute(client))