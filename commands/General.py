import discord
import index
import datetime
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
        """Pong! (get the bots ping)"""
        embed = discord.Embed(title=':ping_pong:  Pong!',
                              color=0x166CD4)
        embed.add_field(name='Ping', value=f'{round(self.client.latency * 1000)}ms')
        await ctx.send(embed=embed)

    # User Info
    @commands.command(aliases=['user-info'])
    @commands.check(index.InBotsChannel)
    @commands.guild_only()
    async def userinfo(self, ctx, member: discord.Member):
        """Fetch info a a particular user"""
        embed = discord.Embed(color=0x166CD4)
        embed.set_thumbnail(url=member.avatar_url)
        embed.add_field(name='**User Info**', value=f'**- ID:** {member.id}\n**- Name:** {member.name}\n**- Discriminator:** #{member.discriminator}\n**- Bot:** {str(member.bot)}\n**- Created At:** {member.created_at.strftime("%m/%d/%Y %H:%M:%S")}', inline=False)
        roles = ''
        for x in member.roles:
            print(x.name)
            if x.name == '@everyone':
                continue
            roles += f'{x.mention} '
        embed.add_field(name='**Server Stats**', value=f'**- Joined At:** {member.joined_at.strftime("%m/%d/%Y %H:%M:%S")}\n**- Roles:** {roles}\n**- Nickname:** {member.nick}', inline=False)
        embed.set_footer(text=f'Requested by {index.UTag(ctx.author)} | {ctx.author.id}', icon_url=ctx.author.avatar_url)
        embed.timestamp = datetime.datetime.utcnow()
        await ctx.send(embed=embed)

    @userinfo.error
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.MissingRequiredArgument):
            await ctx.send(f'{ctx.author.mention} Please specify a user')
        if isinstance(error, commands.BadArgument):
            await ctx.send(f'{ctx.author.mention} Could not find member')

    # Server Info
    @commands.command(aliases=['server-info'])
    @commands.check(index.InBotsChannel)
    @commands.guild_only()
    async def serverinfo(self, ctx):
        """Fetch info on current server"""
        embed = discord.Embed(color=0x166CD4)
        if ctx.message.guild.icon:
            embed.set_thumbnail(url=ctx.guild.icon_url)
        embed.add_field(name='**Server Info**', value=f'**- ID:** {ctx.message.guild.id}\n**- Owner:** {ctx.message.guild.owner.mention}\n**- Region:** {ctx.message.guild.region}\n**- Member Count:** {ctx.message.guild.member_count}\n**- Server Boost:** {ctx.message.guild.premium_subscription_count}', inline=False)
        embed.set_footer(text=f'Requested by {index.UTag(ctx.author)} | {ctx.author.id}', icon_url=ctx.author.avatar_url)
        embed.timestamp = datetime.datetime.utcnow()
        await ctx.send(embed=embed)

    @serverinfo.error
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.BadArgument):
            await ctx.send(f'{ctx.author.mention} Could not find member')

def setup(client):
    client.add_cog(General(client))
