import discord
import random
import index
from discord.ext import commands


class Unmute(commands.Cog):
    def __init__(self, client):
        self.client = client

    # commands
    @commands.command(aliases=['ungag'])
    @commands.has_permissions(kick_members=True, manage_messages=True)
    @commands.guild_only()
    async def unmute(self, ctx, member: discord.Member):
        role = ctx.guild.get_role(717783312709582889)
        if role in member.roles:
            await member.remove_roles(role)
            embed = discord.Embed(
                                  description=f'**{member.mention} has been unmuted!**',
                                  color=0x44B37F)
            await ctx.send(embed=embed)
            await index.AdminLog('Unmuted Member', ctx.author, member, None, 1)
        else:
            await ctx.send(f'{ctx.author.mention} This user is not muted')

    @unmute.error
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.MissingRequiredArgument):
            await ctx.send(f'{ctx.author.mention} Please specify a member to unmute')
        if isinstance(error, commands.BadArgument):
            await ctx.send(f'{ctx.author.mention} Could not find member')


def setup(client):
    client.add_cog(Unmute(client))
