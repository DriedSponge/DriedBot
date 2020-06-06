import json
import discord
import random
import datetime
import os
from discord.ext import commands

with open('botinfo.json') as file:
    data = json.load(file)

client = commands.Bot(command_prefix=data['prefix'])

client.remove_command('help')


async def InBotsChannel(ctx):
    if ctx.channel.name == 'bot-cmds':
        return True
    else:
        await ctx.send(f'{ctx.author.mention} Please use the bot commands channel')
        print('false')
        return False


for filename in os.listdir('./commands'):
    if filename.endswith('.py'):
        client.load_extension(f'commands.{filename[:-3]}')
        print(f'{filename} loaded!')

for filename in os.listdir('./events'):
    if filename.endswith('.py'):
        client.load_extension(f'events.{filename[:-3]}')
        print(f'{filename} loaded!')


@client.event
async def on_ready():
    print('Bot is ready')
    await client.change_presence(activity=discord.Game(name="!help | DriedSponge.net"))


# Logging
async def AdminLog(action, admin, member, reason, status):
    if status == 1:
        color = 0x44B37F
    elif status == 2:
        color = 0xFFA800
    elif status == 3:
        color = 0xFF4040
    elif status == 4:
        color = 0x166CD4

    channel = client.get_channel(506832700502704148)
    embed = discord.Embed(
                          color=color)
    embed.set_author(name=action)
    embed.add_field(name='User', value=member.mention, inline=True)
    embed.add_field(name='Moderator', value=admin.mention, inline=True)
    if reason is not None:
        embed.add_field(name='Reason', value=reason, inline=True)
    embed.timestamp = datetime.datetime.utcnow()
    # embed.set_thumbnail(url=member.avatar_url)
    await channel.send(embed=embed)





client.run(data['token'])
