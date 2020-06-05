import discord
import random
import index
from discord.ext import commands


class Ban(commands.Cog):
    def __init__(self, client):
        self.client = client

    # commands
    @commands.command()
    @commands.has_permissions(ban_members=True)
    @commands.guild_only()
    async def ban(self, ctx, member: discord.Member, *, reason='None'):
        if ctx.author.top_role < member.top_role or ctx.author.top_role == member.top_role or member.bot:
            await ctx.send(f'{ctx.author.mention} You cannot ban someone with greater than or equal power!')
        else:
            if str(ctx.channel.type) != 'private':
                await member.ban(reason=reason)
                embed = discord.Embed(description=f'**{member.mention} has been banned from the server!**',
                                      color=0xFF0000)
                await ctx.send(embed=embed)
                await index.AdminLog('Banned Member', ctx.author, member, reason, 3)

            else:
                response = await ctx.send(f'Please use this command in one of the servers channels')
                await response.delete(delay=5)

    @ban.error
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.MissingRequiredArgument):
            await ctx.send(f'{ctx.author.mention} Please specify a member to ban')
        if isinstance(error, commands.BadArgument):
            await ctx.send(f'{ctx.author.mention} Could not find member')


def setup(client):
    client.add_cog(Ban(client))
