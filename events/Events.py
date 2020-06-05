import discord
import random
import datetime
from discord.ext import commands


class Events(commands.Cog):
    def __init__(self, client):
        self.client = client

    # events
    @commands.Cog.listener()
    async def on_member_join(self, member):
        welcomech = member.guild.system_channel
        embed = discord.Embed(title='Welcome!',
                              description=f'{member.mention} joined the server! We now have {member.guild.member_count} members!',
                              color=0x166CD4)
        await welcomech.send(embed=embed)

    @commands.Cog.listener()
    async def on_member_remove(self, member):
        welcomech = member.guild.system_channel
        embed = discord.Embed(title='Goodbye...',
                              description=f'{member.name} left the server. We now have {member.guild.member_count} members.',
                              color=0xFF4040)
        await welcomech.send(embed=embed)

    @commands.Cog.listener()
    async def on_message_delete(self, message):
        channel = self.client.get_channel(717958874820378624)
        embed = discord.Embed(title="Message Deleted",
                              color=0xFF4040)
        embed.add_field(name='Message Author', value=message.author.mention, inline=True)
        embed.add_field(name='Channel', value=message.channel.mention, inline=True)
        embed.add_field(name='Message Contnent', value=message.content, inline=False)
        embed.timestamp = datetime.datetime.utcnow()
        await channel.send(embed=embed)

    @commands.Cog.listener()
    async def on_message_edit(self, before, after):
        if not before.author.bot:
            channel = self.client.get_channel(717958874820378624)
            embed = discord.Embed(title="Message Edited",
                                  color=0xFFA800)
            embed.add_field(name='Message Author', value=before.author.mention, inline=True)
            embed.add_field(name='Channel', value=before.channel.mention, inline=True)
            embed.add_field(name='Before', value=before.content, inline=False)
            embed.add_field(name='After', value=after.content, inline=False)
            embed.timestamp = datetime.datetime.utcnow()
            await channel.send(embed=embed)

    @commands.Cog.listener()
    async def on_command_error(self, ctx, error):
        if isinstance(error, commands.NoPrivateMessage):
            await ctx.send(f'{ctx.author.mention} Please use this command in the server')
        if isinstance(error, commands.CommandNotFound):
            response = await ctx.send(f'{ctx.author.mention} That command does not exist')
        if isinstance(error, commands.MissingPermissions):
            await ctx.send(f'{ctx.author.mention} You do not have permission to use that command')
        if isinstance(error, commands.BotMissingPermissions):
            await ctx.send(f'{ctx.author.mention} I do not have permission to do this')
        if isinstance(error, commands.NotOwner):
            await ctx.send(f'{ctx.author.mention} You must be the owner of the bot to perform this action')


def setup(client):
    client.add_cog(Events(client))
