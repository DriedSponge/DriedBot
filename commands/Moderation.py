import discord
import random
import index
from discord.ext import commands


class ModCog(commands.Cog, name='Moderation'):
    """All things moderation!"""
    def __init__(self, client):
        self.client = client

    # Ban
    @commands.command()
    @commands.has_permissions(ban_members=True)
    @commands.guild_only()
    async def ban(self, ctx, member: discord.Member, *, reason='None'):
        """Ban a user"""
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

    # Mute
    @commands.command(aliases=['gag'])
    @commands.has_permissions(kick_members=True, manage_messages=True)
    @commands.guild_only()
    async def mute(self, ctx, member: discord.Member, *, reason='None'):
        """Mute a user"""
        if ctx.author.top_role < member.top_role or ctx.author.top_role == member.top_role:
            await ctx.send(f'{ctx.author.mention} You cannot mute someone with greater than or equal power!')
        else:
            role = ctx.guild.get_role(717783312709582889)
            if role in member.roles:
                await ctx.send(f'{ctx.author.mention} This user is already muted')
            else:
                await member.add_roles(role, reason=reason)
                embed = discord.Embed(description=f'**{member.mention} has been muted!**',
                                      color=0xFFA800)
                await ctx.send(embed=embed)
                await index.AdminLog('Muted Member', ctx.author, member, reason, 2)

    @mute.error
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.MissingRequiredArgument):
            await ctx.send(f'{ctx.author.mention} Please specify a member to mute')
        if isinstance(error, commands.BadArgument):
            await ctx.send(f'{ctx.author.mention} Could not find member')

    # Kick
    @commands.command()
    @commands.has_permissions(kick_members=True)
    @commands.guild_only()
    async def kick(self, ctx, member: discord.Member, *, reason='None'):
        """Kick a user"""
        if ctx.author.top_role < member.top_role or ctx.author.top_role == member.top_role:
            await ctx.send(f'{ctx.author.mention} You cannot kick someone with greater than or equal power!')
        else:
            await member.kick(reason=reason)
            embed = discord.Embed(title='Member Kicked',
                                  description=f'{member.mention} has been kicked from the server!',
                                  color=0xFF0000)
            await ctx.send(embed=embed)
            await index.AdminLog('Kicked Member', ctx.author, member, reason, 3)

    @kick.error
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.MissingRequiredArgument):
            await ctx.send(f'{ctx.author.mention} Please specify a member to kick')
        if isinstance(error, commands.BadArgument):
            await ctx.send(f'{ctx.author.mention} Could not find member')

    # Unmute
    @commands.command(aliases=['ungag'])
    @commands.has_permissions(kick_members=True, manage_messages=True)
    @commands.guild_only()
    async def unmute(self, ctx, member: discord.Member):
        """Unmute a muted user"""
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

    # Clear

    @commands.command(aliases=['purge'])
    @commands.has_permissions(manage_messages=True)
    @commands.guild_only()
    async def clear(self, ctx, ammount: int):
        """Clear a channel of a specified ammount of messages"""
        await ctx.channel.purge(limit=ammount)
        channel = self.client.get_channel(717958874820378624)
        embed = discord.Embed(color=0x166CD4)
        embed.set_author(name='Cleared Channel')
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
    client.add_cog(ModCog(client))
